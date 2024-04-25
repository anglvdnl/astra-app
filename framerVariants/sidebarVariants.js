export const asideVariants = {
    initial: {flex: "0 0 294px"},
    animate: state => ({
        flex: state ? "0 0 294px" : "0 0 94px",
        transition: {
            duration: 0.4
        }
    })
}

export const logoVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.3
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.1
        }
    },
}

export const iconVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.4
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.1,
        }
    },
}

export const toggleVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.1,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.1,
        }
    },
}

export const arrowVariants = {
    animate: state => ({
        rotate: state ? 0 : 180
    }),
}

export const activeLinkVariants = {
    animate: state => ({
        background: state ? "var(--background)" : ""
    }),
}