import { ThemeSwitcher } from "./theme-switcher";

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
      <p>Powered by CS2TP-G28</p>
      <ThemeSwitcher />
    </footer>
  );
};

export { Footer };
