import { invoke } from "@tauri-apps/api/core";

let pingInputEl: HTMLInputElement | null;
let pingMsgEl: HTMLElement | null;

async function ping() {
  if (pingMsgEl && pingInputEl) {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    const call = await invoke("plugin:l5e-collector|ping", {
     payload: { 
      value: pingInputEl.value,
     }  
    });
    console.log(JSON.stringify(call))
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
});
