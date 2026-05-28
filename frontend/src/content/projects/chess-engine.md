---
title: chess-engine
description: A fully functional chess engine and GUI written in C++, featuring minimax search with alpha-beta pruning.
tags: ['C++', 'SDL2']
github: https://github.com/fmcewan/chess-engine
date: 2025-06-01
---

A complete chess engine written in C++ with a graphical interface powered by SDL2. Supports player vs player and player vs engine modes, with a custom AI built on classical search techniques.

## Engine

The AI uses minimax search with alpha-beta pruning to explore the game tree. Move ordering — evaluating captures and promotions first — dramatically improves pruning efficiency, allowing the engine to search deeper within the same time budget.

Position evaluation combines standard centipawn material values with piece-square tables, giving the engine an understanding of positional concepts: controlling the centre, keeping the king safe in the endgame, active piece placement.

## Implementation

The codebase is split cleanly across four layers:

- **State** — board representation, move encoding, piece classes
- **Engine** — search, evaluation, move generation and legality
- **App** — SDL2 view and game loop controller
- **Utilities** — FEN parsing for loading arbitrary positions

A full perft test suite validates move generation correctness by counting all possible nodes at a given depth — zero bugs found at depths tested.

## Features

Full rule implementation including castling, en passant, pawn promotion with a graphical overlay, chess clocks, checkmate and stalemate detection.
