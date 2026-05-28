---
title: rgbd-object-classification
description: An early fusion CNN for RGB-D object classification using TensorFlow and Bayesian hyperparameter optimisation.
tags: ['Python', 'TensorFlow', 'Computer Vision']
github: https://github.com/fmcewan/rgbd-object-classification
date: 2025-03-01
---

A convolutional neural network for classifying objects using both colour and depth information, trained on the RGB-D Object Dataset. The project explores early fusion as a strategy for combining multimodal visual data.

## Approach

Standard RGB images have three channels (R, G, B). RGB-D adds a fourth — depth — giving the network information about the 3D structure of the scene. Early fusion combines these channels before the first convolutional layer, producing a 4-channel input of shape (64, 64, 4).

This is relevant to robotics: a robot that understands depth alongside colour can reason about object geometry for grasping and manipulation tasks.

## Architecture

Two convolutional blocks (conv → batch norm → ReLU → max pool) feed into two dense layers with dropout, followed by a softmax output over 51 object categories.

## Hyperparameter optimisation

Bayesian optimisation via Keras Tuner explored the search space of filter counts, kernel sizes, dense layer widths, dropout rate, and learning rate. The optimal configuration used 32 filters in layer one, 224 in layer two, 768-neuron dense layers, 0.2 dropout, and a learning rate of ~4.24e-05.

## Results

Validation accuracy of ~30% across 51 classes, against a 2% random baseline. Distinct object classes (keyboards, food cups, tissues) were classified with high accuracy. Visually similar objects were harder — expected given the relatively shallow architecture and dataset size.
