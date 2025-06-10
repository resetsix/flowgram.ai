import {
  FlowGramNode,
  WorkflowPortType,
  type CreateEdgeParams,
  type CreateNodeParams,
  type CreatePortParams,
} from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeEdge, WorkflowRuntimeNode, WorkflowRuntimePort } from '../entity';
import { FlattenData } from './flat-schema';

export interface DocumentStore {
  nodes: Map<string, WorkflowRuntimeNode>;
  edges: Map<string, WorkflowRuntimeEdge>;
  ports: Map<string, WorkflowRuntimePort>;
}

const createNode = (store: DocumentStore, params: CreateNodeParams): WorkflowRuntimeNode => {
  const node = new WorkflowRuntimeNode(params);
  store.nodes.set(node.id, node);
  return node;
};

const createEdge = (store: DocumentStore, params: CreateEdgeParams): WorkflowRuntimeEdge => {
  const edge = new WorkflowRuntimeEdge(params);
  store.edges.set(edge.id, edge);
  return edge;
};

const getOrCreatePort = (store: DocumentStore, params: CreatePortParams): WorkflowRuntimePort => {
  const createdPort = store.ports.get(params.id);
  if (createdPort) {
    return createdPort as WorkflowRuntimePort;
  }
  const port = new WorkflowRuntimePort(params);
  store.ports.set(port.id, port);
  return port;
};

export const createStore = (params: FlattenData): DocumentStore => {
  const { flattenSchema, nodeBlocks } = params;
  const { nodes, edges } = flattenSchema;
  const store: DocumentStore = {
    nodes: new Map(),
    edges: new Map(),
    ports: new Map(),
  };
  // create root node
  createNode(store, {
    id: FlowGramNode.Root,
    type: FlowGramNode.Root,
    name: FlowGramNode.Root,
    position: { x: 0, y: 0 },
  });
  // create nodes
  nodes.forEach((nodeSchema) => {
    const id = nodeSchema.id;
    const type = nodeSchema.type as FlowGramNode;
    const {
      title = `${type}-${id}-untitled`,
      inputsValues,
      inputs,
      outputs,
      ...data
    } = nodeSchema.data ?? {};
    createNode(store, {
      id,
      type,
      name: title,
      position: nodeSchema.meta.position,
      variable: { inputsValues, inputs, outputs },
      data,
    });
  });
  // create node relations
  nodeBlocks.forEach((blockIDs, parentID) => {
    const parent = store.nodes.get(parentID) as WorkflowRuntimeNode;
    const children = blockIDs
      .map((id) => store.nodes.get(id))
      .filter(Boolean) as WorkflowRuntimeNode[];
    children.forEach((child) => {
      child.parent = parent;
      parent.addChild(child);
    });
  });
  // create edges & ports
  edges.forEach((edgeSchema) => {
    const id = WorkflowRuntimeEdge.createID(edgeSchema);
    const {
      sourceNodeID,
      targetNodeID,
      sourcePortID = 'defaultOutput',
      targetPortID = 'defaultInput',
    } = edgeSchema;
    const from = store.nodes.get(sourceNodeID);
    const to = store.nodes.get(targetNodeID);
    if (!from || !to) {
      throw new Error(`invalid edge schema ID: ${id}, from: ${sourceNodeID}, to: ${targetNodeID}`);
    }
    const edge = createEdge(store, {
      id,
      from,
      to,
    });

    // create from port
    const fromPort = getOrCreatePort(store, {
      node: from,
      id: sourcePortID,
      type: WorkflowPortType.Output,
    });

    // build relation
    fromPort.addEdge(edge);
    edge.fromPort = fromPort;
    from.addPort(fromPort);
    from.addOutputEdge(edge);

    // create to port
    const toPort = getOrCreatePort(store, {
      node: to,
      id: targetPortID,
      type: WorkflowPortType.Input,
    });

    // build relation
    toPort.addEdge(edge);
    edge.toPort = toPort;
    to.addPort(toPort);
    to.addInputEdge(edge);
  });
  return store;
};
