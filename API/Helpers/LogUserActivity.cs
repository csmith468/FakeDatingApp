using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers {
    public class LogUserActivity : IAsyncActionFilter {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next) {
            var resultContext = await next(); //action executED context

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return; //check if user is authenticated

            var userId = resultContext.HttpContext.User.GetUserId();
            var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
            var user = await repo.GetUserByIdAsync(userId);

            user.LastActive = DateTime.UtcNow;
            await repo.SaveAllAsync();
        }
    }
}