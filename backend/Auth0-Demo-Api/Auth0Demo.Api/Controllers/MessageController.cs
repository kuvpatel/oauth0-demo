using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;

namespace Auth0Demo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet("public")]
        public IActionResult GetPublicMessage()
        {
            return Ok(new
            {
                message = "Hello! This is a public API endpoint."
            });
        }

        [Authorize]
        [HttpGet("protected")]
        public IActionResult GetProtectedMessage()
        {
            return Ok(new
            {
                message = "You have accessed a protected endpoint.",
                subject = User.FindFirst("sub")?.Value
            });
        }
    }
}
