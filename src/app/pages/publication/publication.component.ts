import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  communications = [
    {
      id: "1",
      thumb: "DL.jpeg",
      link: "http://www.csi-india.org/downloads/pdf/2/CSIC%20-%20November%20(2020).pdf",
      month: "November"
    },
    {
      id: "2",
      thumb: "Robotics.png",
      link: "http://www.csi-india.org/downloads/pdf/2/CSIC-October%20(2020).pdf",
      month: "October"
    },
    {
      id: "3",
      thumb: "Twins.png",
      link: "http://www.csi-india.org/downloads/pdf/2/CSIC%20-%20September%20(2020).pdf",
      month: "September"
    },
    {
      id: "4",
      thumb: "Open source.png",
      link: "http://www.csi-india.org/downloads/pdf/2/CSIC%20-%20August%20(2020).pdf",
      month: "August"
    },
    {
      id: "5",
      thumb: "VR.png",
      link: "http://www.csi-india.org/downloads/pdf/2/CSIC%20-%20July(2020).pdf",
      month: "July"
    },
    {
      id: "6",
      thumb: "Quantum.png",
      link: "http://www.csi-india.org/downloads/pdf/2/June%202020.pdf",
      month: "June"
    },
    {
      id: "7",
      thumb: "Semantic web.png",
      link: "http://www.csi-india.org/downloads/pdf/2/CSIC%20May(2020).pdf",
      month: "May"
    },
    {
      id: "8",
      thumb: "IoT.png",
      link: "http://www.csi-india.org/downloads/pdf/2/CSIC%20April(2020).pdf",
      month: "April"
    },
    {
      id: "9",
      thumb: "Big Data.png",
      link: "http://www.csi-india.org/downloads/pdf/2/csic%20march(2020).pdf",
      month: "March"
    },
    {
      id: "10",
      thumb: "Green.png",
      link: "http://www.csi-india.org/downloads/pdf/2/csic%20february(2020).pdf",
      month: "February"
    },
    {
      id: "11",
      thumb: "CAE.png",
      link: "http://www.csi-india.org/downloads/pdf/2/CSIC%20Jaunary(2020).pdf",
      month: "January"
    }
  ]

  adhyayan = [
    {
      id: "1",
      thumb: "adhyan.png",
      link: "http://www.csi-india.org/downloads/pdf/3/csi%20adhyayan%20apr%20jun%202020.pdf",
      month: "Apr-Jun 2020"
    },
    {
      id: "2",
      thumb: "adhyan.png",
      link: "http://www.csi-india.org/downloads/pdf/3/csi%20adhyayan%20jan-mar%202020.pdf",
      month: "Jan-Mar 2020"
    }
  ]

  constructor() { }

  ngOnInit(): void {
    $('#main-menu').removeClass("show");
  }

}
