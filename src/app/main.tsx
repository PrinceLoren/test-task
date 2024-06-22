import "../../app/globals.css";
import welcome from "@/shared/lib/welcome";

Promise.all([import("./Root"), import("./App")]).then(
  ([{ default: render }, { default: App }]) => {
    render(App);
  },
);

// welcome message for users in the console
welcome();

// ts(1208)
export {};
