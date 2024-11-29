import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ContactInfoButton from '../сontactInfoButton/ContactInfoButton';
import useConfigPage from '../../store/configPage';

const VideoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '900px',
  margin: '0 auto 2rem',
  position: 'relative',
  paddingTop: '56.25%',
  backgroundColor: '#000',
  border: '2px solid #DC143C',
  borderRadius: '8px',
  overflow: 'hidden',
}));

const VideoIframe = styled('iframe')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(to bottom, #000000, #8B0000, #000000)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  color: '#ffffff'
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(8px)',
  border: '1px solid #DC143C',
  marginBottom: theme.spacing(4),
  color: '#ffffff'
}));

const AnimatedSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delay }
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

const PromoPage = () => {
  const handleBotLink = (e) => {
    e.preventDefault();
    window.open('https://t.me/intelekt_client_bot', '_blank');
  };
  const configCabinet = useConfigPage(state => state.configCabinet);

  return (
    <StyledPaper>
      <Container maxWidth="lg">
        <AnimatedSection>
          <VideoContainer>
            <VideoIframe
              src="https://www.youtube.com/embed/2RTo4YiRrtk"
              title="Intelekt Promo"
              allow="encrypted-media"
              allowFullScreen
            />
          </VideoContainer>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Typography variant="h2" align="center" sx={{ color: '#DC143C', mb: 2, fontWeight: 'bold' }}>
            ЗАРОБЛЯЙ З INTELEKT!
          </Typography>
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            ЗАПРОШУЙТЕ ДРУЗІВ – ТА ОТРИМАЙТЕ КОЖЕН ПО 500 ГРИВЕНЬ!
          </Typography>
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            Кількість запрошень необмежена! 💙💛
          </Typography>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <StyledCard>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#DC143C', mb: 2 }}>
                Як отримати? Дуже просто:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography>
                        Заходимо в Telegram і запускаємо бот{' '}
                        <Link 
                          href="https://t.me/intelekt_client_bot"
                          onClick={handleBotLink}
                          sx={{ color: '#DC143C', textDecoration: 'underline' }}
                        >
                         {configCabinet.telegram_id}
                        </Link>
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary='У головному меню натискаємо кнопку "Підключи друга" потім "Надіслати запрошення" та вводимо номер телефону товариша' />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography>
                        Або залишити заявку на підключення друга за тел.:<ContactInfoButton iconColor="white"/>. 
                        У заявці вкажіть акцію «Приведи друга» та свій логін.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Після отримання смс запрошення Ваш приятель повинен перейти за посиланням в Intelekt Бот, або зісканувати QR-код запрошення з вашого телефону. Далі в Intelekt Бот натиснути 'Розпочати' та 'Надіслати свій номер телефону'"
                  />
                </ListItem>
              </List>
            </CardContent>
          </StyledCard>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Кошти будуть зараховані після підключення друга до Intelekt. Ви зможете отримати їх:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="• На особовий рахунок для користування послугами Intelekt" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Замовити готівкою через Intelekt бот" />
                </ListItem>
              </List>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Кошти товариша будуть зараховані на його бонусний рахунок.
              </Typography>
            </CardContent>
          </StyledCard>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Щоб замовити готівку:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary='1. У головному меню оберіть: "Підключи друга"' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='2. Натисніть кнопку "Зняти кошти"' />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. Введіть суму кратну – 500 грн." />
                </ListItem>
              </List>
            </CardContent>
          </StyledCard>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#DC143C', mb: 2 }}>
                Важливо!
              </Typography>
              <List>
                {[
                  `Бонусні кошти за приведенного друга можна отримати на особовий рахунок для користуванням послуг або замовити готівкою через ${configCabinet.telegram_id}.`,
                  "Замовити бонусні кошти готівкою можна в сумі не менше ніж 500 грн. і не більше ніж сума нарахованого бонусу по акції 'Приведи друга'.",
                  `500 бонусних гривень запрошений друг може отримати тільки, якщо заявка на підключення була подана через ${configCabinet.telegram_id}.`,
                  "Запрошений друг може використати бонусні 500 грн. лише для оплати послуг Інтелект.",
                  "Акція дійсна для абонентів, які підключені до мережі Інтелект.",
                  "Якщо Ваш друг вже підключений до мережі Інтелект або його вже підключали по цій акції, то Ви не зможете отримати за нього бонус.",
                  "Потенційним абонентом, не може бути особа яку запрошують за адресою де надаються, або раніше надавалися послуги інтернет від Інтелект."
                ].map((text, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </AnimatedSection>
      </Container>
    </StyledPaper>
  );
};

export default PromoPage;