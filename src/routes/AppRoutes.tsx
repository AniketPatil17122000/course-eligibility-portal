import { Routes, Route } from "react-router-dom";
import { routeConfig } from "./routeConfig";
import type { RouteInterface } from "../interfaces/interfaces";

const renderRoutes = (routes: RouteInterface[]) =>
  routes.map((route, index) => {

    if (route.children) {
      return (
        <Route key={index + ""} element={route.element}>
          {renderRoutes(route?.children)}
        </Route>
      );
    }

    return (
      <Route
        key={index + ""}
        path={route.path}
        element={route.element}
      />
    );
  });

const AppRoutes = () => <Routes>{renderRoutes(routeConfig)}</Routes>;

export default AppRoutes;
