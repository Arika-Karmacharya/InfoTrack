using AutoMapper;
using Core.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.SearchEngine.LoadSearchEngines
{
    public class LoadSearchEngines : IRequest<List<SearchEngineObj>>
    {
    }

    public class LoadSearchEnginesQueryHandler : IRequestHandler<LoadSearchEngines, List<SearchEngineObj>>
    {
        private readonly IMapper _mapper;

        public LoadSearchEnginesQueryHandler(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<List<SearchEngineObj>> Handle(LoadSearchEngines request, CancellationToken cancellationToken)
        {
            try
            {
                return Enum.GetValues(typeof(SearchEngines))
                    .Cast<SearchEngines>()
                    .Select(p => new SearchEngineObj { Id = (int)p, Name = p.ToString() })
                    .ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
