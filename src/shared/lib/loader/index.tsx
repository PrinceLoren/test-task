import { loader as loaderDefaultOptions } from "@/shared/config";

import asyncComponentLoader from "./loader";
import type { AnyProps, LoadComponent, LoaderDefaultOptions } from "./types";
import { FullSizeSpinner } from "@/shared/ui/loading";

const configuredAsyncComponentLoader = (
  loadComponent: LoadComponent,
  additionalProps: AnyProps = {},
  loaderOptions: LoaderDefaultOptions = loaderDefaultOptions,
  FallbackWaiting = FullSizeSpinner,
) =>
  asyncComponentLoader(
    loadComponent,
    additionalProps,
    loaderOptions,
    FallbackWaiting,
  );

export { loaderDefaultOptions };
export default configuredAsyncComponentLoader;
