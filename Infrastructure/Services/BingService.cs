﻿using Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace Infrastructure.Services
{
    public class BingService : ISearchEngineService
    {
        private readonly IHtmlPageService _webPageService;
        private readonly IMatchService _matchService;
        private readonly IConfiguration _configuration;
        private string BingStaticPage = "https://infotrack-tests.infotrack.com.au/Bing/Page";

        public BingService(IHtmlPageService webPageService, IMatchService matchService, IConfiguration configuration)
        {
            _webPageService = webPageService;
            _matchService = matchService;
            _configuration = configuration;
        }


        public string CountPosition(string searchText)
        {
            try
            {
                List<int> position = new List<int>();

                int totalResult = 0;

                for (int pageNumber = 1; pageNumber <= Int32.Parse(_configuration.GetSection("SearchPageSize").Value); pageNumber++)
                {
                    string prefix = pageNumber > 9 ? "" : "0";

                    var matchedCollection = _matchService.GetMatchedData(@"<li\sclass=[\""\']?b_algo[\""\']?>([^$]+?)<\/div>",
                _webPageService.DownloadWebPage(BingStaticPage + prefix + pageNumber + ".html"));

                    foreach (var item in matchedCollection)
                    {
                        var a = item.ToString();
                        if (a.Contains("https://www.infotrack.com.au"))
                        {
                            position.Add(totalResult + 1);
                        }
                        totalResult++;
                    }
                }

                if (position.Count > 0)
                {
                    return String.Join(",", position);
                }
                return "0";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
