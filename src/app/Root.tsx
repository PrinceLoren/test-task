import { ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/shared/ui/toaster";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <RecoilRoot>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </RecoilRoot>,
  );
}

export default render;
