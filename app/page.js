import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import LinkCard from "@/Components/linkCard";
import styles from "../styles/card.module.scss";
import { cardHeaderTitleTypographyProps } from "@/styles/muiTheme";

export default function Home() {
  return (
    <>
      <div className="header">
        Si vous êtes ici, c&apos;est que Yann-David & Lucie ont le plaisir de vous
        inviter à leur union le 20 juillet 2024 !!
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card className={styles.card}>
            <CardHeader
              className={styles.cardHeader}
              title="Thème du mariage : Floral et/ou couleur vive"
              titleTypographyProps={cardHeaderTitleTypographyProps}
            />
            <CardContent className={styles.cardContent}>
              <div className={styles.alertRed}>
                Tenues blanches à proscrire !
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkCard
            link="/confirmationReceipt"
            headerText="Confirmation Réception"
            contentText="Venez confirmez votre présence lors de la réception qui aura lieu après la cérémonie !"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkCard link="/meal" headerText="Repas" 
          contentText="Nous faisons un buffet participatif : Si vous souhaitez contribuer, informez-nous !"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkCard link="/places" headerText="Lieux" 
          contentText="Retrouvez les différentes adresses où ce dérouleront les festivités !"/>
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkCard link="/weddingList" headerText="Liste de mariage" 
          contentText="Si vous avez à coeur de nous aider à financer notre mariage !"/>
        </Grid>
      </Grid>
    </>
  );
}
