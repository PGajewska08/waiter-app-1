import styles from './Footer.module.scss'

const Footer = () => {
    return (
    <div className={styles.footer}>
        <p className='text-muted'>Copyright &copy BlogApp 2022</p>
    </div>
   
    );
};

export default Footer;