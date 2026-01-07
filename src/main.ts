import { app, BrowserWindow } from "electron";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

let win: BrowserWindow | null = null;
let knownDrives = new Set<string>();

function getUsbDrives(): Promise<Set<string>> {
  return new Promise((resolve) => {
    exec(
      'wmic logicaldisk where "DriveType=2" get DeviceID',
      (err, stdout) => {
        if (err) {
          resolve(new Set());
          return;
        }
        const drives = stdout
          .split("\n")
          .map(v => v.trim())
          .filter(v => v && v !== "DeviceID");
        resolve(new Set(drives));
      }
    );
  });
}

function handleUsbInserted(drive: string) {
  if (!win) return;
  const usbHtmlPath = path.join(drive, "openapp", "index.html");
  if (fs.existsSync(usbHtmlPath)) {
    win.loadFile(usbHtmlPath);
  } else {
    console.log("openapp/index.html が USB に見つかりません:", drive);
  }
}

async function updateUsbState() {
  const current = await getUsbDrives();
  for (const d of current) {
    if (!knownDrives.has(d)) {
      console.log("USB Inserted:", d);
      handleUsbInserted(d);
    }
  }
  knownDrives = current;
}

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL("data:text/html,<h2>USBを挿してください</h2>");
  setInterval(updateUsbState, 2000);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});