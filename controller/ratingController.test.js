const ratingController = require("../controller/ratingController");
const Rating = require("../model/Rating");

jest.mock("../model/Rating");

describe("GET /rating/:id - Get Ratings", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: { id: "671043aec58d973ab418f23e" } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks(); 
  });

  it("should return average rating when ratings are found", async () => {
    Rating.find.mockResolvedValue([{ rating: 4 }, { rating: 5 }]);

    await ratingController.getRating(mockReq, mockRes);

    expect(Rating.find).toHaveBeenCalledWith({
      film_id: "671043aec58d973ab418f23e",
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ averageRating: 4.5 });
  });

  it("should return 0 if no ratings are found", async () => {
    Rating.find.mockResolvedValue([]);

    await ratingController.getRating(mockReq, mockRes);

    expect(Rating.find).toHaveBeenCalledWith({
      film_id: "671043aec58d973ab418f23e",
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ averageRating: 0 });
  });

  it("should return 500 if an error occurs", async () => {
    Rating.find.mockRejectedValue(new Error("Database error"));

    await ratingController.getRating(mockReq, mockRes);

    expect(Rating.find).toHaveBeenCalledWith({
      film_id: "671043aec58d973ab418f23e",
    });
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Failed to fetch ratings.",
    });
  });
});
