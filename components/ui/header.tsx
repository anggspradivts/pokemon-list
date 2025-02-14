interface HeaderProps {
  text: string;
  classnames?: string;
}
const Header = ({ text, classnames }: HeaderProps) => {
  return ( 
    <header className={`${classnames} underline font-extrabold italic text-xl`}>
      {text}
    </header>
   );
}
 
export default Header;