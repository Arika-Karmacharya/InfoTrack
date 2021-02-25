using Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Infrastructure.Services
{
    public class MatchService : IMatchService
    {
        public MatchCollection GetMatchedData(string pattern, string data)
        {
            // create regex object
            Regex r = new Regex(pattern);
            // find match
            MatchCollection mc = r.Matches(data);
            return mc;
        }
    }
}
