# ⚙️ Custom Command Manager (CCM)

> A lightweight command registration system for Minecraft Bedrock scripting – with **aliases**, **type-safe parameters**, and **no privilege errors**.

---

## ✨ Features

- 🔀 **Easy alias support** – Just chain `.alias("yourAlias")` when defining a command.
- 🧠 **Privileged callback workaround** – Bypasses early execution issues by cleanly separating logic.

---

## 🚀 Getting Started

### 1. Register a Command

```ts
import { Command } from "./manager";

Command.register("greet")
  .describe("Sends a greeting to a player")
  .alias("hello")
  .permission("Any") // Options: Any, GameDirectors, Admin, Host, Owner
  .string("message", true)
  .player("target", true);
```

### Register a Command Callback

```ts
import { Player } from "@minecraft/server"
import { Command } from "./manager";
Command.run('greet', (origin, message: string, target: Player[]) => {
  target.sendMessage(message)
})
```
