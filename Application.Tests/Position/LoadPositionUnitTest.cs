using System;
using Xunit;
using Application.Position.LoadPosition;
using Application.Common.Interfaces;
using Moq;
using System.Threading.Tasks;
using System.Threading;

namespace Application.Tests.Position
{
    public class LoadPositionUnitTest
    {
        private LoadSearchEnginesHandler _handler;
        private Mock<Func<string, ISearchEngineService>> _searchEngineServiceMock;

        public LoadPositionUnitTest()
        {
            _searchEngineServiceMock = new Mock<Func<string, ISearchEngineService>>();
            _handler = new LoadSearchEnginesHandler(_searchEngineServiceMock.Object);
        }
        [Fact]
        public async Task ThrowsExceptionGivenNullEventArgument()
        {
            Exception ex = await Assert.ThrowsAsync<NullReferenceException>(() => _handler.Handle(null, CancellationToken.None));
        }
    }
}
