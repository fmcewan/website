---
title: TypeScript's type system is a design tool, not a safety net
date: 2026-05-28
description: Thoughts on writing software with longevity in mind.
---

Most people come to TypeScript for the safety. They've been burned by 'undefined is not a function' one too many times and they want the compiler to catch those errors before they reach production. That's a legitimate reason to use it, but it's also the least interesting thing TypeScript's type system can do.

The safety net framing treats types as something you add after the fact: a layer of protection over code you've already designed where you write the logic, then you annotate it, then the compiler tells you where you went wrong. Types are reactive, not generative.

The more useful way to think about types is as a design tool. Before you write a single line of implementation, you can describe the shape of your problem in the type system. What does a valid request look like? What are the possible states this component can be in? What should it be impossible to represent?

This last question is the important one. A well-designed type system doesn't just catch errors; it makes certain errors unrepresentable. If you model your state correctly, the compiler won't just warn you when something goes wrong. It will make it structurally impossible for something to go wrong in the first place.

The classic example is discriminated unions. Instead of a status field that could be any string, you define exactly the states that exist and what data each one carries. The compiler then forces you to handle every case. You can't forget the error state because the type system won't let you compile until you've dealt with it.

This is a different relationship with types entirely. You're not annotating code. You're using the type system to think through the problem before you've committed to a solution. 
