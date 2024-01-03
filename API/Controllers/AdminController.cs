using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    public class AdminController : BaseApiController {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _uow;

        public AdminController(UserManager<AppUser> userManager, IUnitOfWork uow) {
            _userManager = userManager;
            _uow = uow;
        }


        // [Authorize(Policy = "RequiredAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles() {
            var users = await _userManager.Users
                .OrderBy(u => u.UserName)
                .Select(u => new {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                }).ToListAsync();
            
            return Ok(users);
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("edit-roles/{username}")] //should be a put but to return final list of roles, we made it a post
        public async Task<ActionResult> EditRoles(string username, [FromQuery]string roles) {
            if (string.IsNullOrEmpty(roles)) return BadRequest("You must select at least one role.");

            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);
            if (user == null) return NotFound();

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));
            if (!result.Succeeded) return BadRequest("Failed to add to roles.");
            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));
            if (!result.Succeeded) return BadRequest("Failed to remove from roles.");

            return Ok(await _userManager.GetRolesAsync(user));
        }


        [Authorize(Policy = "RequiredAdminRole")]
        [HttpDelete("delete-account/{username}")]
        public async Task<ActionResult> DeleteAccount(string username) {
            var user = await _uow.UserRepository.GetUserByUsernameAsync(username);

            if (user == null) return NotFound();

            _uow.UserRepository.DeleteUser(user);
            if (await _uow.Complete()) return Ok();
            return BadRequest("Problem deleting photo.");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public ActionResult GetPhotosForModeration() {
            return Ok("Admins or moderators can see this.");
        }
    }
}