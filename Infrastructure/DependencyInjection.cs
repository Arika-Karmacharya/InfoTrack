using Application.Common.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {


            services.AddTransient<IHtmlPageService, HtmlPageService>();
            services.AddTransient<IMatchService, MatchService>();
            services.AddSingleton<GoogleService>();
            services.AddSingleton<BingService>();
            services.AddTransient<Func<string, ISearchEngineService>>(serviceProvider => key =>
            {
                switch (key)
                {
                    case "bing":
                        return serviceProvider.GetService<BingService>();
                    case "google":
                        return serviceProvider.GetService<GoogleService>();
                    default:
                        throw new KeyNotFoundException();
                }
            });
            return services;
        }
    }
}
