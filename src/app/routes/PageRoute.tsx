import { ComponentType, FC } from "react";

interface IPageRoute {
  Component: ComponentType;
}

const PageRoute: FC<IPageRoute> = ({ Component }) => {
  return (
    <div className="w-full flex items-start">
      <Component />
    </div>
  );
};

export default PageRoute;
