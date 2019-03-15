using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Logging;

namespace Tests
{
    public class BaseTest
    {
        protected TestServer _server;
        protected BaseTest()
        {

            _server = new TestServer(
                new WebHostBuilder()
                    .UseStartup<Startup>()
                    .ConfigureLogging((hostingContext, logging) =>
                    {
                        logging.SetMinimumLevel(LogLevel.Error);
                    })
            );
        }
    }
}