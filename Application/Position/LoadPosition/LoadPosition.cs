using Application.Common.Interfaces;
using Core.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Position.LoadPosition
{
    public class LoadPosition : IRequest<string>
    {
        public int searchEngine { get; set; }
        public string SearchText { get; set; }
    }

    public class LoadSearchEnginesHandler : IRequestHandler<LoadPosition, string>
    {

        private readonly Func<string, ISearchEngineService> _searchEngineService;
        public LoadSearchEnginesHandler(Func<string, ISearchEngineService> searchEngineService)
        {
            this._searchEngineService = searchEngineService;
        }

        public async Task<string> Handle(LoadPosition request, CancellationToken cancellationToken)
        {
            try
            {
                string SearchEngine = ((SearchEngines)request.searchEngine).ToString();
                if (String.IsNullOrEmpty(SearchEngine))
                {
                    throw new Exception("Invalid data supplied!");
                }
                return _searchEngineService(SearchEngine.ToLower()).CountPosition(request.SearchText);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
