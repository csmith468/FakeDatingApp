***Fake Dating App (Angular, .NET Core)***

The live version of this website can be found here: https://fakedatingapp.fly.dev/

This fake dating website was built through the following Udemy course: https://www.udemy.com/course/build-an-app-with-aspnet-core-and-angular-from-scratch/learn/

***What was used in this course?***
- **Front-End**
  - Angular (v16)
    - Components, directives, guards, interceptors, interfaces, etc
    - File uploading (images)
  - TypeScript
  - Bootstrap CSS
- **Back-End**
  - ASP.NET Core WebAPI (v7)
  - C#
  - REST APIs
  - .NET Entity Framework Core
  - Automapper
  - SignalR for real-time presence/messaging
  - SQLite → PostgresDB
  - Cloudinary for Image Upload Storage
- **Deployment**
  - Fly.io
  - Docker Container
  - Github Actions for Continuous Integration/Continuous Deployment
- **Features**
  - Client-side login and registration
  - Secure routing
  - Paging, sorting, routing
  - Live private messaging
  - Angular template and reactive forms with validation
  - Photo upload functionality
  - Bootstrap styling
    
***What did I add extend from the original course?***
- **Front-End**
  - Adaptive Layout using Breakpoint Observer
    - Members page adjusts number of members per row based on window size and if filter panel is visible
    - Navigation bar collapses links into menu dropdown, then removes "Welcome" as window size decreases
  - Collapsible filter panel in members list
  - New UI for messaging
  - Extra client-side password validation during registration
  - Gender tag in members list page
  - Home page shows register or members link depending on if logged in
  - Custom Bootswatch theme
  - View-only admin page for members as demonstration
  - Admins may delete users
  - New filter functionality listed below
- **Back-End**
  - Edit gender after registration
  - Sort members by age asc/desc
  - Added filter for if member has photo
  - Admins can delete users/accounts
    
I'm continuing to work on this to improve my skills so check back in for more updates!
