using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Application.Common.Interfaces
{
    public interface IMatchService
    {
        MatchCollection GetMatchedData(string pattern,string data);
    }
}
