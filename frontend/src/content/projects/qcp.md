---
title: Quantum Conformal Prediction 
description: A framework for training parameterised quantum circuits and evaluating them using conformal prediction.
tags: ['Python', 'Quantum ML']
github: https://github.com/fmcewan/qcp
date: 2026-05-01
---

QCP is the practical implementation of my undergraduate dissertation on quantum conformal prediction. It trains parameterised quantum circuits (PQCs) against synthetic data distributions and evaluates them using split conformal prediction — producing calibrated, statistically guaranteed prediction sets.

## The problem

Standard machine learning models produce point predictions with no principled uncertainty quantification. Conformal prediction solves this by wrapping any model in a coverage guarantee: given a miscoverage level α, the prediction set will contain the true value at least 1-α of the time, with no distributional assumptions required.

The question I explored: does this hold when the underlying model is a quantum circuit?

## Pipeline

The framework has three stages, each exposed as a CLI command:

**Train** — optimise a PQC against a target distribution using a YAML specification. Supports regression, classification, and unsupervised circuit architectures with configurable angle encoding strategies.

**Collect** — run the trained circuit on a backend (local Aer simulator or IBM Quantum hardware) to generate shot data, stored in SQLite.

**Predict** — apply split conformal prediction to the collected shots using one of six scoring functions (Euclidean distance, k-nearest neighbours, histogram-based, and others), producing calibrated prediction sets.

## Results

Coverage guarantees held empirically across all tested distributions and scoring functions. The k-nearest neighbour scoring function produces the most informative (tightest) prediction sets. Heteroscedastic distributions proved the hardest case, as expected.
