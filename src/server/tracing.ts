import * as appInsights from 'applicationinsights';
import { Trace } from 'jinaga';

let appInsightsClient: appInsights.TelemetryClient | undefined = undefined;

export function startTracing() {
  if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
    appInsights
      .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
      .setAutoCollectConsole(true, true)
      .start();
    appInsightsClient = appInsights.defaultClient;

    Trace.configure({
      // info(message) {
      //   traceInfo(message);
      // },
      warn(message) {
        traceWarning(message);
      },
      error(message) {
        traceError(message);
      },
      // dependency(name, data, operation) {
      //   return traceDependency(name, data, operation);
      // },
      // metric(message, measurements) {
      //   traceMetric(message, measurements);
      // },
    })
  }
}

export function traceMetric(description: string, measurements: { [key: string]: number; }) {
  if (appInsightsClient) {
    appInsightsClient.trackEvent({ name: description, measurements });
  }
  else {
    console.log(`Metric: ${description}`, measurements);
  }
}

export function traceInfo(description: string) {
  if (appInsightsClient) {
    appInsightsClient.trackTrace({ message: description, severity: appInsights.Contracts.SeverityLevel.Information });
  }
  else {
    console.log(description);
  }
}

export function traceWarning(description: string) {
  if (appInsightsClient) {
    appInsightsClient.trackException({ exception: new Error(description) });
  }
  else {
    console.warn(description);
  }
}

export function traceError(error: any) {
  if (appInsightsClient) {
    appInsightsClient.trackException({ exception: error });
  }
  else {
    console.error(error);
  }
}

export async function traceDependency<T>(name: string, data: string, operation: () => Promise<T>): Promise<T> {
  const start = Date.now();
  let success = false;
  try {
    const result = await operation();
    success = true;
    return result;
  }
  finally {
    const duration = Date.now() - start;
    if (appInsightsClient) {
      appInsightsClient.trackDependency({
        dependencyTypeName: 'Jinaga',
        name,
        data,
        duration,
        resultCode: 0,
        success,
      });
    }
    else {
      console.log(`${name} (${data}): ${duration}ms`);
    }
  }
}