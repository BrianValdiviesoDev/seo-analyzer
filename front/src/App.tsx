import { ChangeEvent, useState, KeyboardEvent } from "react";
import { checkRobots, checkSitemap, pageSpeed, readUrl } from "./services";
import { ScrapperResponse, PageSpeedResponse } from "./interfaces";
import "./styles.scss";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [url, setUrl] = useState<string>("https://brianvaldivieso.com");
  const [result, setResult] = useState<ScrapperResponse>();
  const [metrics, setMetrics] = useState<PageSpeedResponse>();
  const [showForm, setShowForm] = useState<boolean>(true);
  const [sitemap, setSitemap] = useState<string[]>([]);
  const [robots, setRobots] = useState<string>();
  const [performanceData, setPerformanceData] = useState({
    datasets: [
      {
        label: "Performance",
        data: [0, 100],
        backgroundColor: ["#00d9ff", "#00d9ff41"],
        borderColor: ["#00d9ff", "#00d9ff41"],
      },
    ],
  });

  const errorIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUrl(value);
  };

  const analyzeUrl = async () => {
    setShowForm(false);
    const sitemap = await checkSitemap(url);
    setSitemap(sitemap);

    const robots = await checkRobots(url);
    setRobots(robots);

    const response = await readUrl(url);
    setResult(response);

    const metrics = await pageSpeed(url);

    setMetrics(metrics);
    const performance = Number(metrics.Performance.score * 100);
    const rest = Number(100 - performance);
    performanceData.datasets[0].data = [performance, rest];
    setPerformanceData(performanceData);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(url);
    if (e.key === "Enter") {
      analyzeUrl();
    }
  };

  return (
    <main>
      <div className="background"></div>
      {showForm ? (
        <form className="form">
          <h2>What is your url to analyze?</h2>
          <div className="input-icon">
            <input
              type="text"
              placeholder="yoururl.com"
              value={url}
              onChange={handleInputChange}
              onKeyDown={handleKey}
            />
            <div className="icon" onClick={analyzeUrl}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="dashboard">
            <section>
              <div className="card">
                <h2>PageSpeed Insights</h2>
                {metrics ? (
                  <>
                    <div className="metric">
                      {(metrics?.Performance.score * 100).toFixed(0)}
                    </div>
                    <div className="chart">
                      <Doughnut data={performanceData} />
                    </div>

                    <table>
                      <tbody>
                        <tr>
                          <td className="label">Total Blocking Time (30%): </td>
                          <td>
                            {(metrics?.TotalBlockingTime.value / 1000).toFixed(
                              2
                            )}{" "}
                            s
                          </td>
                        </tr>
                        <tr>
                          <td className="label">
                            Largest Contentful Paint (25%):{" "}
                          </td>
                          <td>
                            {(
                              metrics?.LargestContentfulPaint.value / 1000
                            ).toFixed(2)}{" "}
                            s
                          </td>
                        </tr>
                        <tr>
                          <td className="label">
                            Cumulative Layout Shift (25%):{" "}
                          </td>
                          <td>
                            {(
                              metrics?.CumulativeLayoutShift.value / 1000
                            ).toFixed(2)}{" "}
                            s
                          </td>
                        </tr>
                        <tr>
                          <td className="label">
                            First Contentful Paint (10%):{" "}
                          </td>
                          <td>
                            {(
                              metrics?.FirstContentfulPaint.value / 1000
                            ).toFixed(2)}{" "}
                            s
                          </td>
                        </tr>
                        <tr>
                          <td className="label">Speed Index (10%): </td>
                          <td>
                            {(metrics?.SpeedIndex.value / 1000).toFixed(2)} s
                          </td>
                        </tr>
                        <tr>
                          <td className="label">Server Response Time: </td>
                          <td>
                            {(metrics?.ServerResponseTime.value / 1000).toFixed(
                              2
                            )}{" "}
                            s
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                ) : (
                  <img src="loading.gif" />
                )}
              </div>
              <div className="card">
                <h2>SEO Health</h2>
                <div className="check">
                  {sitemap.length > 0 ? (
                    <div className="icon green">{checkIcon}</div>
                  ) : (
                    <div className="icon red">{errorIcon}</div>
                  )}
                  <div>Sitemap</div>
                </div>
                <div className="check">
                  {robots !== "" ? (
                    <div className="icon green">{checkIcon}</div>
                  ) : (
                    <div className="icon red">{errorIcon}</div>
                  )}
                  Robots.txt
                </div>
                <div className="check">
                  {result?.titles &&
                  result?.titles.find(
                    (el) => el && el.tag.toLowerCase() === "h1"
                  ) ? (
                    <div className="icon green">{checkIcon}</div>
                  ) : (
                    <div className="icon red">{errorIcon}</div>
                  )}
                  H1
                </div>
                <div className="check">
                  {result?.title !== "" ? (
                    <div className="icon green">{checkIcon}</div>
                  ) : (
                    <div className="icon red">{errorIcon}</div>
                  )}
                  Title
                </div>
                <div className="check">
                  {metrics && metrics?.Performance.score * 100 > 75 ? (
                    <div className="icon green">{checkIcon}</div>
                  ) : (
                    <div className="icon red">{errorIcon}</div>
                  )}
                  Performance
                </div>
              </div>
            </section>

            <section>
              <div className="card">
                <h2>Basic information</h2>
                {result ? (
                  <table>
                    <tbody>
                      <tr>
                        <td className="label">title:</td>
                        <td>{result.title}</td>
                      </tr>
                      {result.metaTags
                        ?.filter((m) => m.name)
                        .map((meta, i) => (
                          <tr key={`meta${i}`}>
                            <td className="label">
                              <i>{meta.name}:</i>
                            </td>
                            <td>{meta.content}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <img src="loading.gif" />
                )}
              </div>
              <div className="card">
                <h2>Content structure</h2>
                {result ? (
                  <table>
                    <tbody>
                      {result.titles?.map((t, i) => (
                        <tr key={`h${i}`} className="heading-row">
                          <td className="heading-label">{t.tag}</td>
                          <td>{t.content}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <img src="loading.gif" />
                )}
              </div>
            </section>

            <section>
              <div className="card">
                <h2>Links</h2>
                {result ? (
                  <>
                    {result.links?.map((a, i) => (
                      <div key={`a${i}`} className="link-container">
                        <a href={a.href} target="_blank">
                          {a.text ? a.text : "--"}
                        </a>
                        {a.rel ? ` (${a.rel})` : ""}
                      </div>
                    ))}
                  </>
                ) : (
                  <img src="loading.gif" />
                )}
              </div>
              <div className="card">
                <h2>Sitemap</h2>
                {sitemap ? (
                  <>
                    {sitemap?.map((a, i) => (
                      <div key={`a${i}`} className="link-container">
                        {a}
                      </div>
                    ))}
                  </>
                ) : (
                  <img src="loading.gif" />
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
