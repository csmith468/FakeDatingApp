namespace API.Helpers {
    public class UserParams : PaginationParams {
        public string CurrentUsername { get; set; }
        public string Gender { get; set; } = "any";
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 100;
        public string OrderBy { get; set; } = "lastActive";
        public bool PhotoRequired { get; set; } = false;
    }
}