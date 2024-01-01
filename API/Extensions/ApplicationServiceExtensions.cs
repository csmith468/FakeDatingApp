using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Repositories;
using API.Services;
using API.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions {

    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) {
            services.AddCors();
            
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            
            services.AddScoped<LogUserActivity>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            services.AddSignalR();
            services.AddSingleton<PresenceTracker>(); // won't be destroyed after http request is finished
        
            return services;
        }
    }
}