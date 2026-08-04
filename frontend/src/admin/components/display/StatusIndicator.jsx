.metric-grid{

    display:grid;

    gap:22px;

}

.cols-1{

    grid-template-columns:1fr;

}

.cols-2{

    grid-template-columns:
        repeat(2,minmax(0,1fr));

}

.cols-3{

    grid-template-columns:
        repeat(3,minmax(0,1fr));

}

.cols-4{

    grid-template-columns:
        repeat(4,minmax(0,1fr));

}

.cols-5{

    grid-template-columns:
        repeat(5,minmax(0,1fr));

}

@media(max-width:1400px){

    .cols-4,
    .cols-5{

        grid-template-columns:
            repeat(3,minmax(0,1fr));

    }

}

@media(max-width:1000px){

    .cols-3,
    .cols-4,
    .cols-5{

        grid-template-columns:
            repeat(2,minmax(0,1fr));

    }

}

@media(max-width:700px){

    .metric-grid{

        grid-template-columns:1fr !important;

    }

}