/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface LLMProject {
  name: string;
  type: string;
  focus: string;
  tech: string;
  isOpenSource: boolean;
  description: string;
  logoColor: string;
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  description: string;
  technicalDetails: string;
  statusText: string;
  icon: string;
}

export interface SimulatorPreset {
  label: string;
  prompt: string;
  expectedFlow: string[];
  outputType: string;
  outputContent: string;
  semanticGraph: { nodes: string[]; edges: string[] };
}
