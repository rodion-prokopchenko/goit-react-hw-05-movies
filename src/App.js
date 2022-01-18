import "./App.css";
import A from "./components/AppFetch/AppFetch.js";

import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./App.test"));
const MoviesPage = lazy(() => import("./App.test"));

export default function App() {
  return (
    <>
      <A />
    </>
  );

  // <Suspense fallback="">
  //   <Switch>
  //     <Route path="/"></Route>
  //   </Switch>
  // </Suspense>;
}
