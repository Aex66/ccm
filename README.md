# ⚙️ Custom Command Manager (CCM)

> A lightweight command registration system for Minecraft Bedrock scripting – with **aliases**, **type-safe parameters**, and **no privilege errors**.

---

## ✨ Features

- 🔀 **Easy alias support** – Just chain `.alias("yourAlias")` when defining a command.
- 🔐 Custom Requirements with `.requires()` - Sometimes you need more control than the built-in permission levels allow. Use `.requires()` to define a custom condition for whether a command can be executed.
- 🧠 **Privileged callback workaround** – Bypasses early execution issues by cleanly separating logic from metadata registration.

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

## 📥 Installation

### Typescript version:
1. Open a new terminal in the folder you want to install ccm
2. Execute the command `git clone https://github.com/Aex66/ccm`
3. Import `ccm/main.ts` into your entry file.

### Javascript version:
1. Open a new terminal in the folder you want to install ccm
2. Execute the command `git clone -b mainjs --single-branch https://github.com/Aex66/ccm`
3. Import `ccm/main.js` into your entry file.
