"use client";

import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => <p>Loading Swagger UI…</p>,
});

export default function SwaggerUIClient() {
  return <SwaggerUI url="/openapi.json" />;
}
