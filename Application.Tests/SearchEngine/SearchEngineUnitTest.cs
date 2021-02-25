using Application.SearchEngine.LoadSearchEngines;
using AutoMapper;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Application.Tests.SearchEngine
{
    public class LoadSearchEngineUnitTest
    {
        private LoadSearchEnginesQueryHandler _handler;
        private Mock<IMapper> _loadSearchEnginesMock;
        List<SearchEngineObj> searchObj = new List<SearchEngineObj>();

        public LoadSearchEngineUnitTest()
        {
            _handler = new LoadSearchEnginesQueryHandler((IMapper)_loadSearchEnginesMock);
        }

        [Fact]
        public async Task LoadSearchEngineInstance()
        {
            searchObj = await _handler.Handle(new LoadSearchEngines { }, CancellationToken.None);
            Assert.Equal(2, searchObj.Count());
            
        }
    }
}
