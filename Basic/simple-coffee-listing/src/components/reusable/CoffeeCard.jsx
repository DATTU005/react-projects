import React from "react";
import star from "../../assets/Star_fill.svg";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CoffeeCard = ({ coffee }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        backgroundColor: "transparent",
        color: "white",
        position: "relative",
        borderRadius: "10px",
      }}
    >
      <CardMedia
        sx={{ height: 140, color: "white" }}
        image={coffee.image}
        title={coffee.name}
      />
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Title */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.875rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {coffee.name}
          </Typography>

          {/* Price */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.75rem",
              fontWeight: "bold",
              color: "black",
              backgroundColor: "#BEE3CC",
              padding: "2px 6px",
              borderRadius: "5px",
              zIndex: "1",
            }}
          >
            {coffee.price}
          </Typography>
        </div>

        {/* Rating */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.75rem",
                fontWeight: "bold",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={star}
                alt="rating star"
                style={{ marginLeft: "-7px", marginBottom: "4px" }}
              />
              {coffee.rating}
              <Typography
                sx={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  color: "#6F757C",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ({coffee.votes} votes)
              </Typography>
            </Typography>
          </div>
        </div>

        {/* "Popular" badge */}
        {coffee.popular && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.75rem",
              fontWeight: "bold",
              color: "black",
              position: "absolute",
              top: "8px",
              left: "8px",
              backgroundColor: "#F6C768",
              padding: "2px 6px",
              borderRadius: "15px",
              zIndex: "1",
            }}
          >
            Popular
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CoffeeCard;
