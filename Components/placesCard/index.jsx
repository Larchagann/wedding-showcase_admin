"use client";
import React from "react";
import styles from "../../styles/card.module.scss";
import { Card, CardContent, CardHeader } from "@mui/material";
import { cardHeaderTitleTypographyProps } from "@/styles/muiTheme";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function PlacesCard({ headerText, placeName, address, hour }) {
  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title={headerText}
        action={hour}
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        <div className={styles.itemContent}>{placeName}</div>
        <div className={styles.itemContent}>
          {"Adresse : "}
          {address}
        </div>
        {/* <div className={styles.location}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}></Marker>
          </MapContainer>
        </div> */}
      </CardContent>
    </Card>
  );
}
