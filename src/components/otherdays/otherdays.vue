<template>
	<div id="chart-6d" class="chart wa-sg-weather-chart">
        <div class="canvas c-row">
            <svg version="1.2" baseProfile="tiny">
                <path stroke="#e9e9e9" stroke-width="1" stroke-opacity="0.5" fill="none" d="M 103.5 91 C 128 91 148 101.47619047619048 172.5 101.47619047619048 C 197 101.47619047619048 217 101.47619047619048 241.5 101.47619047619048 C 266 101.47619047619048 286 111.95238095238095 310.5 111.95238095238095 C 335 111.95238095238095 355 114.57142857142857 379.5 114.57142857142857"></path>
                <path stroke="#fff" stroke-width="1" stroke-opacity="0.15" fill="none" d="M 34.5 104.0952380952381 C 59 104.0952380952381 79 91 103.5 91"></path>
                <circle cx="103.5" cy="91" r="2.5" fill="#fff"></circle>
                <path stroke="#e9e9e9" stroke-width="1" stroke-opacity="0.5" fill="none" d="M 103.5 135.52380952380952 C 128 135.52380952380952 148 135.52380952380952 172.5 135.52380952380952 C 197 135.52380952380952 217 140.76190476190476 241.5 140.76190476190476 C 266 140.76190476190476 286 143.38095238095238 310.5 143.38095238095238 C 335 143.38095238095238 355 146 379.5 146"></path>
                <path stroke="#fff" stroke-width="1" stroke-opacity="0.15" fill="none" d="M 34.5 143.38095238095238 C 59 143.38095238095238 79 135.52380952380952 103.5 135.52380952380952"></path>
                <circle cx="103.5" cy="135.52380952380952" r="2.5" fill="#fff"></circle>
            </svg>
            <div class="c-span2 weather-bar" data-toggle="ripple">
                <div class="content">
                    <div class="title c-gap-bottom dim"><span class="day">昨天</span>
                        <div class="weather-icons"></div>
                    </div>
                    <div class="wa-sg-weather-canvas-area">
                        <div class="pillar" style="top: 13.0952px;"><span class="pillar-max dim">26°</span>
                            <div class="pillar-chart" style="height: 39.2857px;"></div> <span class="pillar-min dim">11°</span></div>
                    </div>
                    <div class="c-gap-top-large wind dim"><span>南风</span>
                        <div>微风</div>
                    </div>
                </div>
            </div>
            <div class="c-span2 weather-bar" data-toggle="ripple">
                <div class="content">
                    <div class="title c-gap-bottom"><span class="day">今天</span>
                        <div class="weather-icons"></div>
                    </div>
                    <div class="wa-sg-weather-canvas-area">
                        <div class="pillar" style="top: 0px;"><span class="pillar-max">31°</span>
                            <div class="pillar-chart pillar-chart-today" style="height: 44.5238px;"></div> <span class="pillar-min">14°</span></div>
                    </div>
                    <div class="c-gap-top-large wind"><span>风力</span>
                        <div>微风</div>
                    </div>
                </div>
            </div>
            <div class="c-span2 weather-bar active" data-toggle="ripple">
                <div class="content">
                    <div class="title c-gap-bottom"><span class="day">明天</span>
                        <div class="weather-icons"></div>
                    </div>
                    <div class="wa-sg-weather-canvas-area">
                        <div class="pillar" style="top: 10.4762px;"><span class="pillar-max">27°</span>
                            <div class="pillar-chart" style="height: 34.0476px;"></div> <span class="pillar-min">14°</span></div>
                    </div>
                    <div class="c-gap-top-large wind"><span>南风</span>
                        <div>3-4级</div>
                    </div>
                </div>
            </div>
            <div class="c-span2 weather-bar" data-toggle="ripple">
                <div class="content">
                    <div class="title c-gap-bottom"><span class="day">周一</span>
                        <div class="weather-icons"></div>
                    </div>
                    <div class="wa-sg-weather-canvas-area">
                        <div class="pillar" style="top: 10.4762px;"><span class="pillar-max">27°</span>
                            <div class="pillar-chart" style="height: 39.2857px;"></div> <span class="pillar-min">12°</span></div>
                    </div>
                    <div class="c-gap-top-large wind"><span>北风</span>
                        <div>3-4级</div>
                    </div>
                </div>
            </div>
            <div class="c-span2 weather-bar" data-toggle="ripple">
                <div class="content">
                    <div class="title c-gap-bottom"><span class="day">周二</span>
                        <div class="weather-icons"></div>
                    </div>
                    <div class="wa-sg-weather-canvas-area">
                        <div class="pillar" style="top: 20.9524px;"><span class="pillar-max">23°</span>
                            <div class="pillar-chart" style="height: 31.4286px;"></div> <span class="pillar-min">11°</span></div>
                    </div>
                    <div class="c-gap-top-large wind"><span>北风</span>
                        <div>3-4级</div>
                    </div>
                </div>
            </div>
            <div class="c-span2 weather-bar" data-toggle="ripple">
                <div class="content">
                    <div class="title c-gap-bottom"><span class="day">周三</span>
                        <div class="weather-icons"></div>
                    </div>
                    <div class="wa-sg-weather-canvas-area">
                        <div class="pillar" style="top: 23.5714px;"><span class="pillar-max">22°</span>
                            <div class="pillar-chart" style="height: 31.4286px;"></div> <span class="pillar-min">10°</span></div>
                    </div>
                    <div class="c-gap-top-large wind"><span>北风</span>
                        <div>3-4级</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

export default {
}
</script>

<style  lang="less">

</style>
