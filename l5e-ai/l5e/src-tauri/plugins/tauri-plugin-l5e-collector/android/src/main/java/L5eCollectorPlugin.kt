package dev.chuu.l5e.collector

import android.app.Activity
import app.tauri.annotation.Command
import app.tauri.annotation.InvokeArg
import app.tauri.annotation.TauriPlugin
import app.tauri.plugin.JSObject
import app.tauri.plugin.Plugin
import app.tauri.plugin.Invoke

@InvokeArg
class PingArgs {
  var value: String? = null
}

@TauriPlugin
class L5eCollectorPlugin(private val activity: Activity): Plugin(activity) {

    @Command
    fun ping(invoke: Invoke) {
        val args = invoke.parseArgs(PingArgs::class.java)

        val ret = JSObject()
        ret.put("value", "Hello, " + args.value + " from Kotlin!")
        invoke.resolve(ret)
    }
}
