import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  logo: {
    width: 70,
    height: 70,
  },
  vviLogo: {
    width: 70,
    height: 70,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '95%',
    overflow: 'hidden',
    borderRadius: 15,
    marginBottom: 10,
  },
  resultContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 5,
    gap: 10,
  },
  resultLabel: {
    fontWeight: 'bold',
  },
  resultValue: {
    flexShrink: 1,
    fontSize: 30
  }
});