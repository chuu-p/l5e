import { invoke, PermissionState } from "@tauri-apps/api/core";

interface Permissions {
  postNotification: PermissionState;
}

async function perm() {
  const permission = await invoke<Permissions>(
    "plugin:l5e-collector|check_permissions",
  );

  console.log(JSON.stringify(permission))

  if (permission.abc === "prompt-with-rationale") {
    console.log("show information to the user about why permission is needed");

    // request permission
    if (permission.abc.startsWith("prompt")) {
      const state = await invoke<Permissions>("plugin:l5e-collector|request_permissions", {
        permissions: ["abc"],
      });
    }
  }
}

let pingInputEl: HTMLInputElement | null;
let pingMsgEl: HTMLElement | null;

async function ping() {
  if (pingMsgEl && pingInputEl) {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    const call = await invoke("plugin:l5e-collector|ping", {
      payload: {
        value: pingInputEl.value,
      },
    });
    console.log(JSON.stringify(call));
    pingMsgEl.textContent = JSON.stringify(call);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  pingInputEl = document.querySelector("#ping-input");
  pingMsgEl = document.querySelector("#ping-msg");
  document.querySelector("#ping-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    ping();
  });
  pingInputEl = document.querySelector("#perm-input");
  pingMsgEl = document.querySelector("#perm-msg");
  document.querySelector("#perm-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    perm();
  });
});
