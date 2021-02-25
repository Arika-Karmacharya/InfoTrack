using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Position.LoadPosition;
using Application.SearchEngine.LoadSearchEngines;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UI.Web.Controllers
{
    public class SearchEngineController : ApiBaseController
    {
        public async Task<ActionResult<List<SearchEngineObj>>> Get()
        {
            return await Mediator.Send(new LoadSearchEngines());
        }
        [HttpGet("{searchEngine}/{SearchText}")]
        public async Task<ActionResult<string>> Position(int searchEngine, string searchText)
        {
            return await Mediator.Send(new LoadPosition { searchEngine = searchEngine, SearchText = searchText });
        }
    }
}
