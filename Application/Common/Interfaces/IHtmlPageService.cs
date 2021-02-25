using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Common.Interfaces
{
    public interface IHtmlPageService
    {
        string DownloadWebPage(string url);
    }
}
