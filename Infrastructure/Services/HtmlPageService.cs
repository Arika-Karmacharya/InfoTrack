using Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Infrastructure.Services
{
    public class HtmlPageService : IHtmlPageService
    {
        public string DownloadWebPage(string url)
        {
            WebClient webClient = new WebClient();

            byte[] reqHTML;
            reqHTML = webClient.DownloadData(url);
            UTF8Encoding objUTF8 = new UTF8Encoding();
            var htmlData = objUTF8.GetString(reqHTML);
            return htmlData;
        }
    }
}
